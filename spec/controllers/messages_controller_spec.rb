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

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'log in(ログインしている場合のテスト)' do
      before do
        login user
      end

      context 'can save(メッセージの保存に成功した場合)' do
        subject {
          post :create,
          params: params
        }

        it 'count up message(メッセージの保存はできたのか)' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path(意図した画面に遷移しているか)' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save(メッセージの保存に失敗した場合)' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up(メッセージの保存は行われなかったか)' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index(意図したビューが描画されているか)' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in(ログインしていない場合)' do

      it 'redirects to new_user_session_path(意図した画面にリダイレクトできているか)' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
