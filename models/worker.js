const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workerSchema = new Schema({
  imie: {
    type: String,
    required: true,
  },
  nazwisko: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'Worker',
    required: true,
  },
  wizyty: [
    {
      data: { type: Date },
      klient: { type: String },
    },
  ],
});

// workerSchema.methods.removeWizyta = function(wizytaId) {
//   const updatedWizyty = this.wizyty.filter(item => {
//     return item.productId.toString() !== productId.toString();
//   });
//   this.cart.items = updatedCartItems;
//   return this.save();
// };

module.exports = mongoose.model('Worker', workerSchema);
