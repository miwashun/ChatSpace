require 'rails_helper'

RSpec.describe Message, type: :model do
  describe 'メッセージ作成' do
    context 'メッセージセーブ時' do
      it 'メッセージが含まれているか？' do
        expect(build(:message, image: nil)).to be_valid
      end

      it '画像が入っているか？' do
        expect(build(:message, content: nil)).to be_valid
      end

      it '画像とメッセージが含まれているか？' do
        expect(build(:message)).to be_valid
      end
    end

    context 'セーブ禁止' do
      it 'メッセージと画像無し' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
      end

      it 'グループID無し' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      it 'ユーザーID無し' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.error[:user]).to include('を入力してください')
      end
    end
  end
end
