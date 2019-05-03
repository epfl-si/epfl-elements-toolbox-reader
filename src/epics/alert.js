import { switchMap } from 'rxjs/Operator';
import { ofType } from 'redux-observable';
import axios from 'axios';

import {
  GET_VERSION,
  setVersion,
} from '../actions/alert';

/**
 * Will get the doc file and return the content + format to the store
 *
 * @returns setVersion()
 */
export function getPackageLatestVersion(action$) {
  return action$.pipe(
    ofType(GET_VERSION),
    switchMap(() => {
      return axios
        .get('https://api.github.com/repos/frontend/toolbox-utils/releases/latest')
        .then((res) => {
          return setVersion(res.data.tag_name);
        });
    }),
  );
}

export default getPackageLatestVersion;
