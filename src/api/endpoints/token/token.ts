/* ******************************************************************************************************************
 *
 * GE CONFIDENTIAL
 *
 * Copyright (c) 2020 by General Electric Company. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is confidential and proprietary to GE and/or its suppliers.
 * The intellectual and technical concepts contained herein may be covered by one or more U.S. and foreign patents,
 * and are protected by trade secret and/or copyright law. Dissemination or reproduction of this
 * information outside GE is strictly forbidden unless prior written permission is obtained from an authorized
 * representative of GE, or is in accordance with the terms and conditions contained in the written agreement
 * pursuant to which this information was supplied by GE.
 *
 ******************************************************************************************************************* */

import { request, Response } from '../../request';

interface Payload {
  token: string;
  validUntil: string;
}

export default function (url: string) {
  const { unauthorized, authorized } = request(url);

  return {
    validate: async (accessToken: string): Promise<boolean> => {
      const response: Response<boolean> = await unauthorized.get<boolean>('Token', { token: accessToken });
      return response.data;
    },
    create: async (email: string, password: string, deviceId: string, rememberMe: boolean): Promise<string> => {
      const response: Response<Payload> = await unauthorized.post<Payload>('Token', {
        email,
        password,
        deviceId,
        rememberMe
      });
      return response.data.token;
    },
    delete: async (accessToken: string): Promise<boolean> => {
      const response: Response<boolean> = await authorized(accessToken).delete<boolean>('Token');
      return response.data;
    }
  };
}
