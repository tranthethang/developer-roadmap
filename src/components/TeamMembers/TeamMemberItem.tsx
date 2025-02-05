import { MailIcon } from '../ReactIcons/MailIcon';
import { MemberActionDropdown } from './MemberActionDropdown';
import { MemberRoleBadge } from './RoleBadge';
import type { TeamMemberItem } from './TeamMembersPage';

type TeamMemberProps = {
  member: TeamMemberItem;
  userId: string;
  index: number;
  teamId: string;
  canManageCurrentTeam: boolean;
  handleDeleteMember: () => void;
  onUpdateMember: () => void;
  handleSendReminder: () => void;
  onResendInvite: () => void;
};

export function TeamMemberItem(props: TeamMemberProps) {
  const {
    member,
    index,
    onResendInvite,
    onUpdateMember,
    canManageCurrentTeam,
    userId,
    handleDeleteMember,
    handleSendReminder,
  } = props;

  const showNoProgress =
    member.progress.length === 0 && member.status === 'joined';
  const showReminder =
    member.progress.length === 0 &&
    member.status === 'joined' &&
    !(member.userId === userId);

  return (
    <div
      className={`flex items-center justify-between gap-2 p-3 ${
        index === 0 ? '' : 'border-t'
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src={
            member.avatar
              ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${member.avatar}`
              : '/images/default-avatar.png'
          }
          alt={member.name || ''}
          className="hidden h-10 w-10 rounded-full sm:block"
        />
        <div>
          <div className="mb-1 flex items-center gap-2 sm:hidden">
            <MemberRoleBadge role={member.role} />
            {showReminder && (
              <SendProgressReminder handleSendReminder={handleSendReminder} />
            )}
          </div>
          <div className="flex items-center">
            <h3 className="inline-grid grid-cols-[auto_auto_auto] items-center font-medium">
              <span className="truncate">{member.name}</span>
              {showNoProgress && (
                <span className="ml-2 rounded-full bg-gray-600 px-2 py-0.5 text-xs font-normal text-white sm:inline">
                  No Progress
                </span>
              )}
              {member.userId === userId && (
                <span className="ml-2 hidden text-xs font-normal text-blue-500 sm:inline">
                  You
                </span>
              )}
            </h3>
            <div className="ml-2 flex items-center gap-0.5">
              {member.status === 'invited' && (
                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                  Invited
                </span>
              )}
              {member.status === 'rejected' && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                  Rejected
                </span>
              )}
            </div>
          </div>
          <p className="truncate text-sm text-gray-500">
            {member.invitedEmail}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center text-sm">
        {showReminder && (
          <span className="hidden sm:block">
            <SendProgressReminder handleSendReminder={handleSendReminder} />
          </span>
        )}
        <span class={'hidden sm:block'}>
          <MemberRoleBadge role={member.role} />
        </span>
        {canManageCurrentTeam && (
          <MemberActionDropdown
            onResendInvite={onResendInvite}
            onDeleteMember={handleDeleteMember}
            isDisabled={member.userId === userId}
            onUpdateMember={onUpdateMember}
            member={member}
          />
        )}
      </div>
    </div>
  );
}

type SendProgressReminderProps = {
  handleSendReminder: () => void;
};

function SendProgressReminder(props: SendProgressReminderProps) {
  const { handleSendReminder } = props;

  return (
    <button
      onClick={handleSendReminder}
      className="mr-2 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700"
    >
      <MailIcon className="h-3 w-3" />
      <span>Reminder</span>
    </button>
  );
}
