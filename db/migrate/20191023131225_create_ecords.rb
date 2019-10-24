class CreateEcords < ActiveRecord::Migration[6.0]
  def change
    create_table :ecords do |t|
      t.string :title
      t.date :startdate
      t.date :stopdate


      t.timestamps
    end
  end
end
