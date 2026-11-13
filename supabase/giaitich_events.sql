-- Sổ Giải Tích: thống kê truy cập.
-- Đặt chung trong dự án Supabase "review-da-nang" nhưng là bảng RIÊNG, không đụng bảng nào của reviewdanang.vn.
-- Khách (anon) chỉ được GHI; chỉ người đã đăng nhập (authenticated) mới ĐỌC được.
-- Chạy được nhiều lần (idempotent).

create table if not exists public.giaitich_events (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  vid text check (char_length(vid) <= 40),
  path text check (char_length(path) <= 120),
  kind text not null default 'view' check (kind in ('view', 'exam')),
  device text check (device in ('mobile', 'tablet', 'desktop')),
  ref text check (char_length(ref) <= 120),
  host text check (char_length(host) <= 80),
  score numeric check (score between 0 and 10)
);
create index if not exists giaitich_events_at_idx on public.giaitich_events (at);

alter table public.giaitich_events enable row level security;
drop policy if exists giaitich_insert on public.giaitich_events;
create policy giaitich_insert on public.giaitich_events for insert to anon, authenticated with check (true);
drop policy if exists giaitich_read on public.giaitich_events;
create policy giaitich_read on public.giaitich_events for select to authenticated using (true);
revoke all on public.giaitich_events from anon, authenticated;
grant insert on public.giaitich_events to anon, authenticated;
grant select on public.giaitich_events to authenticated;

-- Tự dọn dữ liệu quá 180 ngày (chạy ngẫu nhiên khoảng 1% số lần ghi), để bảng không phình mãi.
create or replace function public.giaitich_cleanup() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if random() < 0.01 then
    delete from public.giaitich_events where at < now() - interval '180 days';
  end if;
  return null;
end $$;
drop trigger if exists giaitich_cleanup_trg on public.giaitich_events;
create trigger giaitich_cleanup_trg after insert on public.giaitich_events
  for each statement execute function public.giaitich_cleanup();

-- Số liệu tổng hợp cho trang /#/admin (giờ Việt Nam).
create or replace function public.giaitich_stats(days int default 30) returns json
language sql stable security invoker set search_path = public as $$
  with e as (select * from giaitich_events where at > now() - make_interval(days => days)),
       v as (select * from e where kind = 'view'),
       vn as (select (now() at time zone 'Asia/Ho_Chi_Minh')::date as d)
  select json_build_object(
    'views', (select count(*) from v),
    'visitors', (select count(distinct vid) from v),
    'exams', (select count(*) from e where kind = 'exam'),
    'avgScore', (select round(avg(score), 2) from e where kind = 'exam'),
    'today', (select count(*) from v, vn where (v.at at time zone 'Asia/Ho_Chi_Minh')::date = vn.d),
    'todayVisitors', (select count(distinct vid) from v, vn where (v.at at time zone 'Asia/Ho_Chi_Minh')::date = vn.d),
    'live', (select count(distinct vid) from giaitich_events where at > now() - interval '5 minutes'),
    'daily', (select coalesce(json_agg(d order by d.day), '[]'::json) from (
        select (at at time zone 'Asia/Ho_Chi_Minh')::date as day, count(*) as views, count(distinct vid) as visitors
        from v group by 1) d),
    'top', (select coalesce(json_agg(t), '[]'::json) from (
        select path, count(*) as n from v group by path order by n desc limit 20) t),
    'devices', (select coalesce(json_agg(t), '[]'::json) from (
        select coalesce(device, '?') as device, count(*) as n from v group by 1 order by n desc) t),
    'refs', (select coalesce(json_agg(t), '[]'::json) from (
        select coalesce(nullif(ref, ''), '(trực tiếp)') as ref, count(*) as n from v where ref is not null group by 1 order by n desc limit 10) t),
    'hosts', (select coalesce(json_agg(t), '[]'::json) from (
        select coalesce(host, '?') as host, count(*) as n from v group by 1 order by n desc) t),
    'hours', (select coalesce(json_agg(t order by t.h), '[]'::json) from (
        select extract(hour from at at time zone 'Asia/Ho_Chi_Minh')::int as h, count(*) as n from v group by 1) t)
  );
$$;
revoke all on function public.giaitich_stats(int) from public, anon;
grant execute on function public.giaitich_stats(int) to authenticated;
