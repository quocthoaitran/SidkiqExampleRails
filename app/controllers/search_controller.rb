require 'faraday'
require 'faraday_middleware'



class SearchController < ApplicationController
  def find
    url = 'https://images-api.nasa.gov'
    conn = Faraday.new(url: url) do |faraday|
      faraday.adapter Faraday.default_adapter
      faraday.response :json
    end
    response = conn.get('search', media_type:'image', q: params[:key])
    HardWorker.perform_async(response.body)
    render json: {
      message: "Save done 100 first images of result to database",
      status: :ok
    }
  end
end
