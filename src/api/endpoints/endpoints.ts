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

import token from './token';

function unauthorized(url: string) {
  return {
    token: token(url)
  };
}


function authorized(url: string, accessToken: string) {
  return {
    ...unauthorized(url),
    /*
    notification: notification(url, accessToken),
    organizations: organizations(url, accessToken),
    users: users(url, accessToken),
    productInformation: productInformation(url, accessToken)

*/
  };
}

function endpoints() {
  return {
    unauthorized,
    authorized
  };
}

export default endpoints();
