export const Table = (props) => {
  const users = props.users;

  return (
    <table className="table mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">email</th>
          <th scope="col">number</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, i) => (
          <tr key={i}>
            <th scope="row">1</th>
            <td>{user.email}</td>
            <td>{user.number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
