import { useAuth } from "@p-features/login/hooks/use-auth";
import { RulesList } from "@p-features/rules/components/rules-list";
import { useAllRules } from "@p-features/rules/hooks/use-all-rules";

function MessagedError(props: { error: Error }) {
  return <pre>{props.error.message}</pre>;
}

export function ManageRulesPage() {
  useAuth("redirect-if-anon");
  const rulesQ = useAllRules();

  if (rulesQ.isLoading || rulesQ.isIdle) {
    return <h1>Loading...</h1>;
  }

  if (rulesQ.isError) {
    return (
      <div>
        <h1>Error</h1>
        <pre>{JSON.stringify(rulesQ.error, null, 2)}</pre>
      </div>
    );
  }

  const contentE = rulesQ.data
    .mapRight((rules) => (
      <div>
        <h1>Rules</h1>
        <RulesList rules={rules} />
      </div>
    ))
    .mapLeft((fail) => {
      if (fail instanceof Error) {
        return <MessagedError error={fail} />;
      }
      return (
        <div>
          <h1>Errors</h1>
          {fail.map((error) => (
            <div key={error.ruleId}>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
          ))}
        </div>
      );
    });

  return contentE.value;

  // const [ruleType, setRuleType] = useState<RuleType>("one-time");
  // return (
  //   <div>
  //     <select onChange={(e) => setRuleType(e.currentTarget.value as RuleType)} value={ruleType}>
  //       {RuleTypes.map((t) => (
  //         <option key={t} value={t}>
  //           {t}
  //         </option>
  //       ))}
  //     </select>
  //     <br />
  //     <CreateRuleForm type={ruleType} />
  //   </div>
  // );
}
