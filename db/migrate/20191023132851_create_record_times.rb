class CreateRecordTimes < ActiveRecord::Migration[6.0]
  def change
    create_table :record_times do |t|
      t.string :title
      t.date :startdate
      t.date :stopdate
      t.string :timer

      t.timestamps
    end
  end
end
