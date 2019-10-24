class RecordTimesController < ApplicationController
    def index
        @records = RecordTimes.all
      end
end
