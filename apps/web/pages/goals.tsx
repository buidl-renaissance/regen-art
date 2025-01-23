import { useEffect, useState } from 'react';
import { ConnectWallet, useAddress, useContract, useSDK } from "@thirdweb-dev/react";
import { 
  Container,
  Typography,
  Stack,
  Button,
  Grid,
  Paper,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

interface Goal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function GoalsPage() {
  const address = useAddress();
  const sdk = useSDK();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
  });

  // Example contract address - replace with your actual contract address
  const { contract } = useContract("your-contract-address");

  useEffect(() => {
    const fetchGoals = async () => {
      if (!address) return;
      
      try {
        // Here you would typically fetch goals associated with the user's DID
        // This is a placeholder implementation
        const userGoals = await contract?.call("getGoalsByUser", [address]);
        setGoals(userGoals || []);
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [address, contract]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewGoal({ title: '', description: '' });
  };

  const addGoal = async () => {
    if (!address || !contract) return;

    try {
      setLoading(true);
      // Add goal to contract
      const tx = await contract.call("createGoal", [
        address,
        newGoal.title,
        newGoal.description
      ]);

      // Wait for transaction confirmation
      await tx.wait();

      // Refresh goals list
      const updatedGoals = await contract.call("getGoalsByUser", [address]);
      setGoals(updatedGoals);
      
      handleCloseDialog();
    } catch (error) {
      console.error("Error creating goal:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleGoalCompletion = async (goalId: string) => {
    if (!address || !contract) return;

    try {
      setLoading(true);
      const tx = await contract.call("toggleGoalCompletion", [address, goalId]);
      await tx.wait();

      // Refresh goals list
      const updatedGoals = await contract.call("getGoalsByUser", [address]);
      setGoals(updatedGoals);
    } catch (error) {
      console.error("Error toggling goal completion:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!address) {
    return (
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Stack spacing={4} alignItems="center">
          <Typography variant="h3">Connect Your Wallet</Typography>
          <Typography>Please connect your wallet to view and manage your goals</Typography>
          <ConnectWallet />
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Stack spacing={4}>
        <Typography variant="h3">My Goals</Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpenDialog}
          sx={{ alignSelf: 'flex-start' }}
        >
          Add New Goal
        </Button>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Create New Goal</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="Goal"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={addGoal} variant="contained">Create Goal</Button>
          </DialogActions>
        </Dialog>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {goals.map((goal) => (
              <Grid item xs={12} md={6} lg={4} key={goal.id}>
                <Paper 
                  elevation={2}
                  sx={{ p: 3 }}
                >
                  <Stack spacing={2}>
                    <Typography variant="h5">{goal.title}</Typography>
                    <Typography>{goal.description}</Typography>
                    <Button
                      variant="contained"
                      onClick={() => toggleGoalCompletion(goal.id)}
                      color={goal.completed ? "success" : "inherit"}
                      fullWidth
                    >
                      {goal.completed ? "Completed" : "Mark as Complete"}
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
}
