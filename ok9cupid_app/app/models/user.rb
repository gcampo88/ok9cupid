class User < ActiveRecord::Base
  # has_many: favorites
  attr_reader :password
  validates :name, :password_digest, :zipcode, :email, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  before_validation :ensure_session_token

  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)
    return nil unless @user

    @user.is_password?(password) ? @user : nil
  end

  def self.generate_session_token
    SecureRandom.base64
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token = User.generate_session_token unless self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end


end
