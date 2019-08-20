class HardWorker
  include Sidekiq::Worker

  def perform(body)
    body['collection']['items'].each do |item|
      Photo.create(name: item['data'][0]['title'], url: item['links'][0]['href'], description: item['data'][0]['description'])
    end
  end
end
