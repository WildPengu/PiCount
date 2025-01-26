import { Document, Model, model, Schema } from 'mongoose';

interface Asset {
	cryptoId: string;
	amount: number;
	id: string;
}

interface IUserAssets extends Document {
	assets: {
		crypto: Map<string, Asset>;
		stocks: Map<string, Asset>;
		metals: Map<string, Asset>;
	};
	userId: string;
}

const cryptoSchema = new Schema<Asset, Model<Asset>>({
	cryptoId: {
		type: String,
		required: true,
		unique: true,
	},
	amount: {
		type: Number,
		required: true,
	},
});

const userExpensesSchema = new Schema<IUserAssets, Model<IUserAssets>>({
  assets: {
    crypto: {
      type: Map,
      of: cryptoSchema,
      default: new Map(),
    },
    stocks: {
      type: Map,
      default: new Map(),
    },
    metals: {
      type: Map,
      default: new Map(),
    },
  },
  userId: String,
});

const UserAssets = model<IUserAssets, Model<IUserAssets>>(
  'assets',
  userExpensesSchema
);

export { Asset, cryptoSchema, IUserAssets, UserAssets };

