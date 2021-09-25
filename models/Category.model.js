import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    gender: [{ type: String, enum: ["men", "women", "girls", "boys"] }],
  },
  {
    timestamps: true,
  }
);

//adding unique gender array only
// categorySchema.pre("save", function (next) {
//   this.gender = _.uniq(this.gender);
//   next();
// });
const Category = mongoose.model("Category", categorySchema);

export default Category;
