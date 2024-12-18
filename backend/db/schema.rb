# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_12_18_171011) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "chat_group_members", force: :cascade do |t|
    t.integer "chat_group_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chat_group_id"], name: "index_chat_group_members_on_chat_group_id"
    t.index ["user_id"], name: "index_chat_group_members_on_user_id"
  end

  create_table "chat_groups", force: :cascade do |t|
    t.boolean "is_dm"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.string "comment_text"
    t.integer "user_id", null: false
    t.integer "post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "food_posts", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "post_date_time"
    t.string "post_text"
    t.integer "recipe_id", null: false
    t.integer "planned_meal_id", null: false
    t.integer "image_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["image_id"], name: "index_food_posts_on_image_id"
    t.index ["planned_meal_id"], name: "index_food_posts_on_planned_meal_id"
    t.index ["recipe_id"], name: "index_food_posts_on_recipe_id"
    t.index ["user_id"], name: "index_food_posts_on_user_id"
  end

  create_table "images", force: :cascade do |t|
    t.binary "image"
    t.string "metadata"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingredients", force: :cascade do |t|
    t.string "name"
    t.integer "default_measurement_unit"
    t.float "calories_per_default_measure"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "likes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_likes_on_post_id"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.integer "sender_id", null: false
    t.string "message_text"
    t.integer "image_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["image_id"], name: "index_messages_on_image_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "planned_meals", force: :cascade do |t|
    t.integer "image_id", null: false
    t.integer "recipe_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["image_id"], name: "index_planned_meals_on_image_id"
    t.index ["recipe_id"], name: "index_planned_meals_on_recipe_id"
  end

  create_table "progress_updates", force: :cascade do |t|
    t.integer "image_id", null: false
    t.text "progress_info"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["image_id"], name: "index_progress_updates_on_image_id"
  end

  create_table "recipe_ingredients", force: :cascade do |t|
    t.integer "recipe_id", null: false
    t.integer "ingredient_id", null: false
    t.integer "measurement_unit"
    t.float "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ingredient_id"], name: "index_recipe_ingredients_on_ingredient_id"
    t.index ["recipe_id"], name: "index_recipe_ingredients_on_recipe_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.integer "author_id", null: false
    t.text "recipe_text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_recipes_on_author_id"
  end

  create_table "saved_posts", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_saved_posts_on_created_at"
    t.index ["post_id"], name: "index_saved_posts_on_post_id"
    t.index ["user_id"], name: "index_saved_posts_on_user_id"
  end

  create_table "saved_recipes", force: :cascade do |t|
    t.integer "recipe_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_saved_recipes_on_recipe_id"
    t.index ["user_id"], name: "index_saved_recipes_on_user_id"
  end

  create_table "user_relationships", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "related_user_id", null: false
    t.integer "relationship_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["related_user_id"], name: "index_user_relationships_on_related_user_id"
    t.index ["user_id"], name: "index_user_relationships_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.integer "weekly_plan_id"
    t.boolean "gender"
    t.string "name"
    t.string "surname"
    t.string "contact"
    t.string "email"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
    t.index ["weekly_plan_id"], name: "index_users_on_weekly_plan_id"
  end

  create_table "weekly_plan_meals", force: :cascade do |t|
    t.integer "weekly_plan_id", null: false
    t.integer "planned_meal_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["planned_meal_id"], name: "index_weekly_plan_meals_on_planned_meal_id"
    t.index ["weekly_plan_id"], name: "index_weekly_plan_meals_on_weekly_plan_id"
  end

  create_table "weekly_plans", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "chat_group_members", "chat_groups"
  add_foreign_key "chat_group_members", "users"
  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users"
  add_foreign_key "food_posts", "images"
  add_foreign_key "food_posts", "planned_meals"
  add_foreign_key "food_posts", "recipes"
  add_foreign_key "food_posts", "users"
  add_foreign_key "likes", "posts"
  add_foreign_key "likes", "users"
  add_foreign_key "messages", "images"
  add_foreign_key "messages", "senders"
  add_foreign_key "planned_meals", "images"
  add_foreign_key "planned_meals", "recipes"
  add_foreign_key "progress_updates", "images"
  add_foreign_key "recipe_ingredients", "ingredients"
  add_foreign_key "recipe_ingredients", "recipes"
  add_foreign_key "recipes", "authors"
  add_foreign_key "saved_posts", "posts"
  add_foreign_key "saved_posts", "users"
  add_foreign_key "saved_recipes", "recipes"
  add_foreign_key "saved_recipes", "users"
  add_foreign_key "user_relationships", "related_users"
  add_foreign_key "user_relationships", "users"
  add_foreign_key "users", "weekly_plans"
  add_foreign_key "weekly_plan_meals", "planned_meals"
  add_foreign_key "weekly_plan_meals", "weekly_plans"
end
