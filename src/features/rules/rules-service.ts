import { Either, mergeInMany } from "@sweet-monads/either";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { Failure } from "runtypes";
import { toEither } from "@p/runtypes";
import { Entity, None } from "@p/ts";
import { RuleSchema, Rule } from "./rules";

function getRulesCollection() {
  return collection(getFirestore(), "rules");
}

export type ParseRuleError = {
  code: "invalid-doc";
  ruleId: string;
  ruleName: string;
  error: Failure;
};

function parseRule(document: QueryDocumentSnapshot): Either<ParseRuleError, Entity<Rule>> {
  const rawData = document.data();
  const r = RuleSchema.validate(rawData);
  return toEither(r)
    .mapRight((rule) => ({
      id: document.id,
      data: rule,
    }))
    .mapLeft((fail) => ({
      code: "invalid-doc",
      ruleId: document.id,
      ruleName: rawData.name ? String(rawData.name) : "<null>",
      error: fail,
    }));
}

export async function getAllRules() {
  const snap = await getDocs(getRulesCollection());
  const ruleEs = snap.docs.map((document) => parseRule(document));
  return mergeInMany(ruleEs);
}

export async function setRule(id: None<string>, data: Partial<unknown>) {
  const ruleId = id ?? nanoid(6);
  const ruleRef = doc(getRulesCollection(), ruleId);

  await setDoc(ruleRef, data, { merge: true });
  return ruleId;
}

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- meh
  (window as any).$$setRule = setRule;
}
