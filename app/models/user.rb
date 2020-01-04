class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :authentications, dependent: :destroy
  has_many :tasks, dependent: :destroy
  accepts_nested_attributes_for :authentications

  validates :name, presence: true
end
