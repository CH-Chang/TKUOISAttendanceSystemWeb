import { persistCombineReducers } from "redux-persist-immutable";
import storage from "redux-persist/lib/storage";
import createEncryptor from "redux-persist-transform-encrypt";

import AES256Config from "../configs/AES256Config";

import { reducer as IndexReducer } from "./index/index";
import { reducer as UserReducer } from "./user/index";
import { reducer as HeaderReducer } from "./header/index";
import { reducer as DashboardReducer } from "./dashboard/index";
import { reducer as CheckReducer } from "./check/index";

const encryptor = createEncryptor({
  secretKey: AES256Config.key,
  onError: (err) => {},
});

export default persistCombineReducers(
  {
    transforms: [encryptor],
    key: "root",
    storage: storage,
    whitelist: ["User"],
  },
  {
    Index: IndexReducer,
    User: UserReducer,
    Header: HeaderReducer,
    Dashboard: DashboardReducer,
    Check: CheckReducer,
  }
);
