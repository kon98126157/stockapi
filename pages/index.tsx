import { Button, Group, Text, Input, TextInput, Checkbox, Box } from "@mantine/core";
import axios from 'axios';
import { useEffect, useState } from "react";
import { IconAt } from '@tabler/icons';
import { useForm } from '@mantine/form';

function IndexPage() {

  const form = useForm({
    initialValues: {
      FEstockName: '',
    },
  });

  const [stockPrice, setStockPrice] = useState(0)

  async function getPrice(BEstockName: string) {
    try {
      const { data } = await axios.post("/api/proxy/getstockprice", {
        body: {
          stockName: BEstockName,
        }
      });
      setStockPrice(data.result)
      console.log(data.result)
    }
    catch (e) {
    }
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => {getPrice(values.FEstockName)})}>
        <TextInput
          withAsterisk
          label="stock name"
          placeholder="Plz type stock name here"
          {...form.getInputProps('FEstockName')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>

        <Text>{stockPrice}</Text>
      </form>
    </Box>
  );
}
export default IndexPage