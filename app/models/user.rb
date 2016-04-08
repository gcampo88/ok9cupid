class User < ActiveRecord::Base
  attr_reader :password
  # validates :name, :password_digest, :zipcode, :email, presence: true
  # validates :email, uniqueness: true
  # validates :password, length: { minimum: 6, allow_nil: true }

  before_validation :ensure_session_token

  has_many :favorites
  has_attached_file :image, default_url: ("default.jpg"), styles: { original:  {convert_options: '-auto-orient'} }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user

    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.base64
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    user = User.find_by(provider: provider, uid: uid)
    return user if user

    name = auth_hash[:info][:name]
    email = auth_hash[:info][:email]

    user = User.create!(
      provider: provider,
      uid: uid,
      name: name,
      email: email
      )

    return user

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
