# == Schema Information
#
# Table name: messages
#
#  id            :integer          not null, primary key
#  content       :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  chat_group_id :integer          not null
#  user_id       :integer          not null
#
# Indexes
#
#  index_messages_on_chat_group_id  (chat_group_id)
#  index_messages_on_user_id        (user_id)
#
# Foreign Keys
#
#  chat_group_id  (chat_group_id => chat_groups.id)
#  user_id        (user_id => users.id)
#
require "test_helper"

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
