import { HelpInviteMembers } from "./HelpInviteMembers"
import { HelpRegisterBranch } from "./HelpRegisterBranch"
import { HelpRegisterCompany } from "./HelpRegisterCompany"
import { HelpRegisterDatabase } from "./HelpRegisterDatabase"
import { HelpReportRequest } from "./HelpReportRequest"

export const HelpSteps = () => {
  return (
    <section className="mx-2 m-auto">
      <HelpRegisterCompany />
      <HelpRegisterDatabase />
      <HelpRegisterBranch />
      <HelpReportRequest />
      <HelpInviteMembers />
    </section>
  )
}