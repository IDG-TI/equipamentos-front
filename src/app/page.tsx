import Application from "@components/page/Application";
import { cookies } from "next/headers";
import LoginScreen from "@organisms/Login_Screen";
import { CURRENT_VERSION } from "@organisms/Release_Notes";


export default async function Page() {

  async function checkIsUserIsInCurrentVersionAndUpdateCookieToNewVersion(authToken: string) {
    const userVersion = cookies().get("user-version")?.value
    return userVersion === CURRENT_VERSION;
  }

  const authToken = cookies().get("auth-token")?.value;

  if (!authToken) {
    return <LoginScreen />
  }

  const req = await fetch(`${process.env.API_APONTAMENTO_URL}/get-permissions`, {
    headers: {
      Authorization: authToken
    },
  });

  if (req.ok) {
    const userAlreadyViewedReleaseNotes = await checkIsUserIsInCurrentVersionAndUpdateCookieToNewVersion(authToken);
    const { roles, module } = await req.json();
    return <Application roles={roles} module={module} userAlreadyViewedReleaseNotes={userAlreadyViewedReleaseNotes} />
  };

  return <LoginScreen />
}



