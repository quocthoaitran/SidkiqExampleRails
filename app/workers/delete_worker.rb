class DeleteWorker
  include Sidekiq::Worker

  def perform
    Photo.destroy_all
  end
end