# == Schema Information
#
# Table name: chat_groups
#
#  id         :integer          not null, primary key
#  is_dm      :boolean
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class ChatGroupTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
