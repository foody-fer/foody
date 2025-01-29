# == Schema Information
#
# Table name: members
#
#  id            :integer          not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  chat_group_id :integer          not null
#  user_id       :integer          not null
#
# Indexes
#
#  index_members_on_chat_group_id  (chat_group_id)
#  index_members_on_user_id        (user_id)
#
# Foreign Keys
#
#  chat_group_id  (chat_group_id => chat_groups.id)
#  user_id        (user_id => users.id)
#
require "test_helper"

class MemberTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
