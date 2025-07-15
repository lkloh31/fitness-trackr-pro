import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { Link, useNavigate, useParams } from "react-router";

export default function ActivityDetails() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  const { id } = useParams();
  const activity = activities?.find((act) => act.id === parseInt(id));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;
  if (!activity) return <p>Activity not found</p>;

  return (
    <div>
      <h2>{activity.name}</h2>
      <p>{activity.description}</p>
      <DeleteItem key={activity.id} activity={activity} />
    </div>
  );
}

function DeleteItem({ activity }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", "/activities/" + activity.id, ["activities"]);

  const handleDelete = async () => {
    try {
      await deleteActivity();
      //   navigate("/activities");
    } catch (e) {
      console.error("Delete failed:", e);
    }
  };

  return (
    <div>
      {token && (
        <button onClick={handleDelete}>
          {loading ? "Deleting..." : error ? error : "Delete"}
        </button>
      )}
    </div>
  );
}
