class CreateImages < ActiveRecord::Migration[8.0]
  def change
    create_table :images do |t|
      t.binary :image
      t.string :metadata

      t.timestamps
    end
  end
end
