# README

* Ruby version

    ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-darwin18]

* Database creation

## groupsテーブル
|Column|Type|Options|
|:------|----:|:-------:|
|user_id|integer|null: false, foreign_key: true|
group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


* How to run the test suite

* Services

    search engines

