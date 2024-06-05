import help_2 from '../../assets/images/InviteMember2.png'
import help_3 from '../../assets/images/InviteMember3.png'
import help_4 from '../../assets/images/InviteMember4.png'
import help_5 from '../../assets/images/InviteMember5.png'

export const HelpInviteMembers = () => {
  return (
    <details className=''>
      <summary className="list-none p-4 font-semibo text-lg -text--color-semidark-violet border-b hover:opacity-80 hover:cursor-pointer shadow-md">
        Invite Members
      </summary>
      <ol className='p-4'>
        <li className='mb-2'>
          1. If you are the owner you can invite members to a branch. Click on the "Invite users" button
          <img src={help_2} />
        </li>
        <li className='mb-2'>
          3. Enter the user name of the member you wish to invite and assign them a role.
          <img src={help_3} />
        </li>
        <li className='mb-2'>
          4. Wait
          <img src={help_4} />
        </li>
        <li className='mb-2'>
          5. You will receive a messagge: "Invitation successfully sent"
          <img src={help_5} />
        </li>
      </ol>
    </details>
  )
}