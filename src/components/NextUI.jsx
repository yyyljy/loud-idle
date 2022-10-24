import { Button, Spacer, Grid } from "@nextui-org/react";
function NextUITest() {
  return (
    <>
      {" "}
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <div>
        <Button disabled>1</Button>
      </div>
      <div>
        <Button size="xs">Mini</Button>
        <Spacer y={0.5} />
        <Button size="sm">Small</Button>
        <Spacer y={0.5} />
        <Button>Medium</Button>
        <Spacer y={0.5} />
        <Button size="lg">Large</Button>
        <Spacer y={0.5} />
        <Button size="xl">Xlarge</Button>
        <Spacer y={0.5} />
        <Button auto>Auto Width</Button>
      </div>
      <div>
        <Grid.Container gap={2}>
          <Grid>
            <Button color="primary" auto>
              Primary
            </Button>
          </Grid>
          <Grid>
            <Button color="secondary" auto>
              Secondary
            </Button>
          </Grid>
          <Grid>
            <Button color="success" auto>
              Success
            </Button>
          </Grid>
          <Grid>
            <Button color="warning" auto>
              Warning
            </Button>
          </Grid>
          <Grid>
            <Button color="error" auto>
              Error
            </Button>
          </Grid>
          <Grid>
            <Button color="gradient" auto>
              Gradient
            </Button>
          </Grid>
        </Grid.Container>
      </div>
    </>
  );
}

export default NextUITest;
