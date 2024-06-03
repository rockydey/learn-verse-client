import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useSessionData from "../../../hooks/useSessionData";
import UploadMaterial from "./UploadMaterial";

const UploadMaterials = () => {
  const [sessions] = useSessionData();

  return (
    <div>
      <SectionTitle heading='Upload Session Materials' subHeading='' />
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {sessions.map(
          (session) =>
            session.status === "approve" && (
              <UploadMaterial
                key={session._id}
                session={session}></UploadMaterial>
            )
        )}
      </div>
    </div>
  );
};

export default UploadMaterials;
