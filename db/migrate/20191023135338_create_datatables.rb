class CreateDatatables < ActiveRecord::Migration[6.0]
  def change
    create_table :datatables do |t|
      t.string :title
      t.string :datestart
      t.string :datastop
      t.string :timer

      t.timestamps
    end
  end
end
