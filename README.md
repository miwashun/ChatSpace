# README

* Ruby version

    ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-darwin18]

* Database creation

## messageテーブル

|Column|Type|Options|
|:-----|---:|:-----:|
|content  |text|null: false|
|image|text|null: false|
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user

## userテーブル

|Column|type|Options|
|:-----|---:|:-----:|
|name|string|null: false, unique: true, index: true|
|group_id|integer|null: false, foreign_key: true|

### Association

- has_many :groups, through: :group_users
- has_many :group_users
- has_many :messages

## groupテーブル

|Column|Type|Options|
|:-----|---:|:-----:|
|name|string|null: false|

### Association

- has_many :users, through: :group_users
- has_many :group_users

## group-userテーブル

|Column|Type|Options|
|:------|----:|:-------:|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


* How to run the test suite

* Services

    search engines

