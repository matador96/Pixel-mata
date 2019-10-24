class DatatablesController < ApplicationController

    

 def index
  @data = Datatable.all
  render json: Datatable.all
end

def create
  data = Datatable.create(data_params)
  render json: data
end

def destroy
  Datatable.destroy(params[:title])
end

def update
  data = Datatable.find(params[:id])
  data.update_attributes(data_params)
  render json: data
end

private

def data_params
  params.require(:data).permit(:title, :datestart, :datastop, :timer)
end

end