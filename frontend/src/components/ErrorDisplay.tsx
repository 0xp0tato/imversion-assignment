function ErrorDisplay(props: any) {
  const { error } = props;
  return (
    <div style={{ color: "red", marginTop: "20px" }}>
      <h3>Error:</h3>
      <p>{error.message}</p>
      {error.details && error.details.errors && (
        <ul>
          {error.details.errors.map((err: any, index: number) => (
            <li key={index}>
              {err.msg} (Field: {err.path}, Value: {err.value})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ErrorDisplay;
