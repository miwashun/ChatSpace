require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in(ログインしている場合)' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it 'assigns @message(アクション内で定義している@messageがあるか)' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group(アクション内で定義している@groupがあるか)' do
        expect(assigns(:group)).to eq group
      end

      it 'renders index(該当するビューが描画されているかどうか)' do
        expect(response).to render_template :index
      end
    end

    context 'not log in(ログインをしていない場合)' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path(意図したビューにリダイレクトできているか)' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end

  end
end
