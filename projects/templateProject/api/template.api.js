import allureReporter from "@wdio/allure-reporter";
import Fetcher from "../../../support/helpers/fetcher";
import { utcTimestamp } from "../../../support/helpers/utils";
import { USER_AGENT } from "../config/wdio.shared.conf";
import { urls } from "../constants/urls";
import templateMutation from "./graphql/template-mutations/templateMutation.graphql";
import templateQuery from "./graphql/template-queries/templateQuery.graphql";

const fetcher = new Fetcher(urls[process.env.TEST_ENVIRONMENT].website + "graphql", USER_AGENT);

export const templateQueryCall = async (site, language) => {
  await allureReporter.startStep(utcTimestamp() + "graphql template query");
  const variables = { language, site };
  let response = await fetcher.graphqlClient.request(templateQuery, variables);
  await allureReporter.endStep("passed");
  return response;
};

export const templateMutationCall = async (currency, id, authToken) => {
  await allureReporter.startStep(utcTimestamp() + "graphql template mutation");
  fetcher.graphqlClient.setHeader("authorization", `Bearer ${authToken}`);
  const variables = { input: { currency, id } };
  let response = await fetcher.graphqlClient.request(templateMutation, variables);
  await allureReporter.endStep("passed");
  return response;
};
