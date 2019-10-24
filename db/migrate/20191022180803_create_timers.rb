class CreateTimers < ActiveRecord::Migration[6.0]
  def change
    create_table :timers do |t|
      t.string :timestart
      t.string :timestop

      t.timestamps
    end
  end
end
