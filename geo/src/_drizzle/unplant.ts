/**
 * Database Unplant
 */

import { getTableName, is, Table } from "drizzle-orm";
import { isPgEnum, PgEnum, PgTable } from "drizzle-orm/pg-core";

import { pgClient } from "./client";

import * as account from "./schema/account";
import * as accountTransaction from "./schema/account-transaction";
import * as accountTransactionRole from "./schema/account-transaction-role";
import * as accountType from "./schema/account-type";
import * as address from "./schema/address";
import * as betterAuth from "./schema/better-auth";
import * as chartOfAccount from "./schema/chart-of-account";
import * as chartOfAccountType from "./schema/chart-of-account-type";
import * as city from "./schema/city";
import * as contact from "./schema/contact";
import * as contract from "./schema/contract";
import * as contractItem from "./schema/contract-item";
import * as contractStatus from "./schema/contract-status";
import * as country from "./schema/country";
import * as countryCurrency from "./schema/country-currency";
import * as currency from "./schema/currency";
import * as division from "./schema/division";
import * as email from "./schema/email";
import * as journal from "./schema/journal";
import * as profile from "./schema/profile";
import * as profileAddress from "./schema/profile-address";
import * as profileEmail from "./schema/profile-email";
import * as profileTelephoneNumber from "./schema/profile-telephone-number";
import * as property from "./schema/property";
import * as session from "./schema/session";
import * as telephoneNumber from "./schema/telephone-number";
import * as tenant from "./schema/tenant";
import * as transaction from "./schema/transaction";
import * as transactionType from "./schema/transaction-type";
import * as user from "./schema/user";
import * as userAccount from "./schema/user-account";
import * as userContract from "./schema/user-contract";

// Aggregate Schema Module
const schema = {
  ...account,
  ...accountTransaction,
  ...accountTransactionRole,
  ...accountType,
  ...address,
  ...betterAuth,
  ...chartOfAccount,
  ...chartOfAccountType,
  ...city,
  ...contact,
  ...contract,
  ...contractItem,
  ...contractStatus,
  ...country,
  ...countryCurrency,
  ...currency,
  ...division,
  ...email,
  ...journal,
  ...profile,
  ...profileAddress,
  ...profileEmail,
  ...profileTelephoneNumber,
  ...property,
  ...session,
  ...telephoneNumber,
  ...tenant,
  ...transaction,
  ...transactionType,
  ...user,
  ...userAccount,
  ...userContract,
};

async function unplant() {
  try {
    console.info("Unplanting Start");

    console.debug("Connecting to Database...");
    await pgClient.connect();
    console.debug("Connected to Database.");

    console.debug("Unseeding Database...");

    // const relationList = Object.entries(schema)
    //   .filter(([, value]) => !is(value, Table) && !isPgEnum(value));

    // console.debug("Relation List:", relationList.map(([name]) => name));

    // Filter Table
    const tableList = Object.entries(schema)
      .filter(([, value]) => is(value, Table));
    // console.debug("Table List Length:", tableList.length);
    // console.debug("Table List:", tableList.map(([name]) => name));

    // Unseed (DROP) Table
    for (const [, tableValue] of tableList) {
      const tableName = getTableName(tableValue as PgTable);
      const query = `DROP TABLE IF EXISTS "${tableName}" CASCADE;`;
      await pgClient.query(query);
      console.debug(`Unseeding ${tableName} Table Complete.`);
    }

    // Filter Enum
    const typeList = Object.entries(schema)
      .filter(([, value]) => isPgEnum(value));
    // console.debug("Enum List Length:", enumList.length);
    // console.debug("Enum List:", enumList.map(([name]) => name));

    // Unseed (DROP) Type
    for (const [, typeValue] of typeList) {
      const typeName = (
        typeValue as unknown as PgEnum<[string, ...string[]]>
      ).enumName;
      const query = `DROP TYPE IF EXISTS "${typeName}" CASCADE;`;
      await pgClient.query(query);
      console.debug(`Unseeding ${typeName} Type Complete.`);
    }

    // Unseed (DROP) drizzle Schema
    await pgClient.query(`DROP SCHEMA IF EXISTS "drizzle" CASCADE;`);
    console.debug(`Unseeding drizzle Schema Complete.`);

    console.debug("Unseeding Database Complete.");
  } catch (error) {
    console.error(`Error Unseeding Database: ${error}`);
    process.exit(1);
  } finally {
    await pgClient.end();
    console.debug("Database Connection Closed.");
  }
}

// Make sure the function wait for the promise to complete
unplant()
  .then(() => {
    console.info("Unplanting Finish");
    process.exit(0);
  })
  .catch((error) => {
    console.error(`Error Unplanting: ${error}`);
    process.exit(1);
  });
