create table users (
  id bigserial primary key,
  name varchar(100) not null,
  email varchar(255) not null unique,
  password_hash varchar(100) not null,
  created_at timestamptz not null default now()
);

create table products (
  id bigserial primary key,
  product_key varchar(120) not null unique,
  name varchar(300) not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table price_snapshots (
  id bigserial primary key,
  product_id bigint not null references products(id),
  store varchar(50) not null,
  price numeric(12,2) not null,
  captured_at timestamptz not null default now()
);
create index idx_snapshots_product_time on price_snapshots(product_id, captured_at);

create table reviews (
  id bigserial primary key,
  product_id bigint not null references products(id),
  user_id bigint not null references users(id),
  rating int not null check (rating between 1 and 5),
  title varchar(120),
  body text not null,
  status varchar(20) not null default 'APPROVED',
  created_at timestamptz not null default now(),
  unique (product_id, user_id)
);

create table store_ratings (
  id bigserial primary key,
  product_id bigint not null references products(id),
  store varchar(50) not null,
  avg_rating numeric(3,2),
  review_count int,
  last_fetched timestamptz not null default now(),
  unique (product_id, store)
);

create table price_alerts (
  id bigserial primary key,
  user_id bigint not null references users(id),
  product_id bigint not null references products(id),
  target_price numeric(12,2) not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

