/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as healthCheck from "../healthCheck.js";
import type * as http from "../http.js";
import type * as revenuecat from "../revenuecat.js";
import type * as subscriptions from "../subscriptions.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  healthCheck: typeof healthCheck;
  http: typeof http;
  revenuecat: typeof revenuecat;
  subscriptions: typeof subscriptions;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  revenuecat: {
    customers: {
      get: FunctionReference<
        "query",
        "internal",
        { appUserId: string },
        null | {
          _creationTime: number;
          _id: string;
          aliases: Array<string>;
          appUserId: string;
          attributes?: Record<string, { updated_at_ms: number; value: string }>;
          firstSeenAt: number;
          lastSeenAt?: number;
          originalAppUserId: string;
          updatedAt: number;
        }
      >;
      getByOriginalId: FunctionReference<
        "query",
        "internal",
        { originalAppUserId: string },
        null | {
          _creationTime: number;
          _id: string;
          aliases: Array<string>;
          appUserId: string;
          attributes?: Record<string, { updated_at_ms: number; value: string }>;
          firstSeenAt: number;
          lastSeenAt?: number;
          originalAppUserId: string;
          updatedAt: number;
        }
      >;
    };
    entitlements: {
      check: FunctionReference<
        "query",
        "internal",
        { appUserId: string; entitlementId: string },
        boolean
      >;
      getActive: FunctionReference<
        "query",
        "internal",
        { appUserId: string },
        Array<{
          _creationTime: number;
          _id: string;
          appUserId: string;
          billingIssueDetectedAt?: number;
          entitlementId: string;
          expiresAtMs?: number;
          isActive: boolean;
          isSandbox: boolean;
          productId?: string;
          purchasedAtMs?: number;
          store?:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
          unsubscribeDetectedAt?: number;
          updatedAt: number;
        }>
      >;
      list: FunctionReference<
        "query",
        "internal",
        { appUserId: string },
        Array<{
          _creationTime: number;
          _id: string;
          appUserId: string;
          billingIssueDetectedAt?: number;
          entitlementId: string;
          expiresAtMs?: number;
          isActive: boolean;
          isSandbox: boolean;
          productId?: string;
          purchasedAtMs?: number;
          store?:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
          unsubscribeDetectedAt?: number;
          updatedAt: number;
        }>
      >;
    };
    experiments: {
      get: FunctionReference<
        "query",
        "internal",
        { appUserId: string; experimentId: string },
        null | {
          _creationTime: number;
          _id: string;
          appUserId: string;
          enrolledAtMs: number;
          experimentId: string;
          offeringId?: string;
          updatedAt: number;
          variant: string;
        }
      >;
      list: FunctionReference<
        "query",
        "internal",
        { appUserId: string },
        Array<{
          _creationTime: number;
          _id: string;
          appUserId: string;
          enrolledAtMs: number;
          experimentId: string;
          offeringId?: string;
          updatedAt: number;
          variant: string;
        }>
      >;
      listByExperiment: FunctionReference<
        "query",
        "internal",
        { experimentId: string },
        Array<{
          _creationTime: number;
          _id: string;
          appUserId: string;
          enrolledAtMs: number;
          experimentId: string;
          offeringId?: string;
          updatedAt: number;
          variant: string;
        }>
      >;
    };
    invoices: {
      get: FunctionReference<
        "query",
        "internal",
        { invoiceId: string },
        {
          _creationTime: number;
          _id: string;
          appUserId: string;
          currency?: string;
          environment: "SANDBOX" | "PRODUCTION";
          invoiceId: string;
          issuedAt: number;
          priceInPurchasedCurrency?: number;
          priceUsd?: number;
          productId?: string;
          store?:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
        } | null
      >;
      listByUser: FunctionReference<
        "query",
        "internal",
        { appUserId: string },
        Array<{
          _creationTime: number;
          _id: string;
          appUserId: string;
          currency?: string;
          environment: "SANDBOX" | "PRODUCTION";
          invoiceId: string;
          issuedAt: number;
          priceInPurchasedCurrency?: number;
          priceUsd?: number;
          productId?: string;
          store?:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
        }>
      >;
    };
    subscriptions: {
      getActive: FunctionReference<
        "query",
        "internal",
        { appUserId: string },
        Array<{
          _creationTime: number;
          _id: string;
          appUserId: string;
          autoRenewStatus?: boolean;
          autoResumeAtMs?: number;
          billingIssueDetectedAt?: number;
          cancelReason?: string;
          commissionPercentage?: number;
          countryCode?: string;
          currency?: string;
          entitlementIds?: Array<string>;
          environment: "SANDBOX" | "PRODUCTION";
          expirationAtMs?: number;
          expirationReason?: string;
          gracePeriodExpirationAtMs?: number;
          isFamilyShare: boolean;
          isTrialConversion?: boolean;
          newProductId?: string;
          offerCode?: string;
          originalTransactionId: string;
          ownershipType?: "PURCHASED" | "FAMILY_SHARED";
          periodType: "TRIAL" | "INTRO" | "NORMAL" | "PROMOTIONAL" | "PREPAID";
          presentedOfferingId?: string;
          priceInPurchasedCurrency?: number;
          priceUsd?: number;
          productId: string;
          purchasedAtMs: number;
          renewalNumber?: number;
          store:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
          taxPercentage?: number;
          transactionId: string;
          updatedAt: number;
        }>
      >;
      getByOriginalTransaction: FunctionReference<
        "query",
        "internal",
        { originalTransactionId: string },
        null | {
          _creationTime: number;
          _id: string;
          appUserId: string;
          autoRenewStatus?: boolean;
          autoResumeAtMs?: number;
          billingIssueDetectedAt?: number;
          cancelReason?: string;
          commissionPercentage?: number;
          countryCode?: string;
          currency?: string;
          entitlementIds?: Array<string>;
          environment: "SANDBOX" | "PRODUCTION";
          expirationAtMs?: number;
          expirationReason?: string;
          gracePeriodExpirationAtMs?: number;
          isFamilyShare: boolean;
          isTrialConversion?: boolean;
          newProductId?: string;
          offerCode?: string;
          originalTransactionId: string;
          ownershipType?: "PURCHASED" | "FAMILY_SHARED";
          periodType: "TRIAL" | "INTRO" | "NORMAL" | "PROMOTIONAL" | "PREPAID";
          presentedOfferingId?: string;
          priceInPurchasedCurrency?: number;
          priceUsd?: number;
          productId: string;
          purchasedAtMs: number;
          renewalNumber?: number;
          store:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
          taxPercentage?: number;
          transactionId: string;
          updatedAt: number;
        }
      >;
      getByUser: FunctionReference<
        "query",
        "internal",
        { appUserId: string },
        Array<{
          _creationTime: number;
          _id: string;
          appUserId: string;
          autoRenewStatus?: boolean;
          autoResumeAtMs?: number;
          billingIssueDetectedAt?: number;
          cancelReason?: string;
          commissionPercentage?: number;
          countryCode?: string;
          currency?: string;
          entitlementIds?: Array<string>;
          environment: "SANDBOX" | "PRODUCTION";
          expirationAtMs?: number;
          expirationReason?: string;
          gracePeriodExpirationAtMs?: number;
          isFamilyShare: boolean;
          isTrialConversion?: boolean;
          newProductId?: string;
          offerCode?: string;
          originalTransactionId: string;
          ownershipType?: "PURCHASED" | "FAMILY_SHARED";
          periodType: "TRIAL" | "INTRO" | "NORMAL" | "PROMOTIONAL" | "PREPAID";
          presentedOfferingId?: string;
          priceInPurchasedCurrency?: number;
          priceUsd?: number;
          productId: string;
          purchasedAtMs: number;
          renewalNumber?: number;
          store:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
          taxPercentage?: number;
          transactionId: string;
          updatedAt: number;
        }>
      >;
      getInGracePeriod: FunctionReference<
        "query",
        "internal",
        { appUserId: string },
        Array<{
          _creationTime: number;
          _id: string;
          appUserId: string;
          autoRenewStatus?: boolean;
          autoResumeAtMs?: number;
          billingIssueDetectedAt?: number;
          cancelReason?: string;
          commissionPercentage?: number;
          countryCode?: string;
          currency?: string;
          entitlementIds?: Array<string>;
          environment: "SANDBOX" | "PRODUCTION";
          expirationAtMs?: number;
          expirationReason?: string;
          gracePeriodExpirationAtMs?: number;
          isFamilyShare: boolean;
          isTrialConversion?: boolean;
          newProductId?: string;
          offerCode?: string;
          originalTransactionId: string;
          ownershipType?: "PURCHASED" | "FAMILY_SHARED";
          periodType: "TRIAL" | "INTRO" | "NORMAL" | "PROMOTIONAL" | "PREPAID";
          presentedOfferingId?: string;
          priceInPurchasedCurrency?: number;
          priceUsd?: number;
          productId: string;
          purchasedAtMs: number;
          renewalNumber?: number;
          store:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
          taxPercentage?: number;
          transactionId: string;
          updatedAt: number;
        }>
      >;
      isInGracePeriod: FunctionReference<
        "query",
        "internal",
        { originalTransactionId: string },
        {
          billingIssueDetectedAt?: number;
          gracePeriodExpiresAt?: number;
          inGracePeriod: boolean;
        }
      >;
    };
    transfers: {
      getByEventId: FunctionReference<
        "query",
        "internal",
        { eventId: string },
        {
          _creationTime: number;
          _id: string;
          entitlementIds?: Array<string>;
          eventId: string;
          timestamp: number;
          transferredFrom: Array<string>;
          transferredTo: Array<string>;
        } | null
      >;
      list: FunctionReference<
        "query",
        "internal",
        { limit?: number },
        Array<{
          _creationTime: number;
          _id: string;
          entitlementIds?: Array<string>;
          eventId: string;
          timestamp: number;
          transferredFrom: Array<string>;
          transferredTo: Array<string>;
        }>
      >;
    };
    virtualCurrency: {
      getBalance: FunctionReference<
        "query",
        "internal",
        { appUserId: string; currencyCode: string },
        {
          _creationTime: number;
          _id: string;
          appUserId: string;
          balance: number;
          currencyCode: string;
          currencyName: string;
          updatedAt: number;
        } | null
      >;
      listBalances: FunctionReference<
        "query",
        "internal",
        { appUserId: string },
        Array<{
          _creationTime: number;
          _id: string;
          appUserId: string;
          balance: number;
          currencyCode: string;
          currencyName: string;
          updatedAt: number;
        }>
      >;
      listTransactions: FunctionReference<
        "query",
        "internal",
        { appUserId: string; currencyCode?: string },
        Array<{
          _creationTime: number;
          _id: string;
          amount: number;
          appUserId: string;
          currencyCode: string;
          environment: "SANDBOX" | "PRODUCTION";
          productId?: string;
          source?: string;
          timestamp: number;
          transactionId: string;
        }>
      >;
    };
    webhookEvents: {
      getByEventId: FunctionReference<
        "query",
        "internal",
        { eventId: string },
        null | {
          _creationTime: number;
          _id: string;
          appId?: string;
          appUserId?: string;
          environment: "SANDBOX" | "PRODUCTION";
          error?: string;
          eventId: string;
          eventType: string;
          payload: any;
          processedAt: number;
          status: "processed" | "failed" | "ignored";
          store?:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
        }
      >;
      listByType: FunctionReference<
        "query",
        "internal",
        { eventType: string; limit?: number },
        Array<{
          _creationTime: number;
          _id: string;
          appId?: string;
          appUserId?: string;
          environment: "SANDBOX" | "PRODUCTION";
          error?: string;
          eventId: string;
          eventType: string;
          payload: any;
          processedAt: number;
          status: "processed" | "failed" | "ignored";
          store?:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
        }>
      >;
      listByUser: FunctionReference<
        "query",
        "internal",
        { appUserId: string; limit?: number },
        Array<{
          _creationTime: number;
          _id: string;
          appId?: string;
          appUserId?: string;
          environment: "SANDBOX" | "PRODUCTION";
          error?: string;
          eventId: string;
          eventType: string;
          payload: any;
          processedAt: number;
          status: "processed" | "failed" | "ignored";
          store?:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
        }>
      >;
      listFailed: FunctionReference<
        "query",
        "internal",
        { limit?: number },
        Array<{
          _creationTime: number;
          _id: string;
          appId?: string;
          appUserId?: string;
          environment: "SANDBOX" | "PRODUCTION";
          error?: string;
          eventId: string;
          eventType: string;
          payload: any;
          processedAt: number;
          status: "processed" | "failed" | "ignored";
          store?:
            | "AMAZON"
            | "APP_STORE"
            | "MAC_APP_STORE"
            | "PADDLE"
            | "PLAY_STORE"
            | "PROMOTIONAL"
            | "RC_BILLING"
            | "ROKU"
            | "STRIPE"
            | "TEST_STORE";
        }>
      >;
    };
    webhooks: {
      process: FunctionReference<
        "mutation",
        "internal",
        {
          event: {
            app_id?: string;
            app_user_id?: string;
            environment: "SANDBOX" | "PRODUCTION";
            id: string;
            store?:
              | "AMAZON"
              | "APP_STORE"
              | "MAC_APP_STORE"
              | "PADDLE"
              | "PLAY_STORE"
              | "PROMOTIONAL"
              | "RC_BILLING"
              | "ROKU"
              | "STRIPE"
              | "TEST_STORE";
            type: string;
          };
          payload: any;
        },
        { eventId: string; processed: boolean; rateLimited?: boolean }
      >;
    };
  };
};
