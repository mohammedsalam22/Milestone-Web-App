import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
  Stack,
  Alert,
  Skeleton,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  AttachMoney,
  Receipt,
  TrendingUp,
  TrendingDown,
  Payment,
  Discount,
  School,
  CalendarToday,
  Print,
  Download,
  Add,
  Edit,
  Delete,
  Visibility,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { fetchStudentPayments, clearStudentPayments, createPayment } from '../../../featuers/payments-slice/paymentsSlice';
import { fetchStudentFeeAssignments, clearStudentFeeAssignments, createFeeAssignment } from '../../../featuers/fee-assignments-slice/feeAssignmentsSlice';
import { fetchAllFees } from '../../../featuers/fees-slice/feesSlice';
import { fetchAllDiscounts } from '../../../featuers/discounts-slice/discountsSlice';

const FinancialSection = ({ studentId }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selectedFeeAssignment, setSelectedFeeAssignment] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [addPaymentDialogOpen, setAddPaymentDialogOpen] = useState(false);
  const [addFeeAssignmentDialogOpen, setAddFeeAssignmentDialogOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    amount_paid: '',
    date: new Date().toISOString().split('T')[0],
    fee_assignment: '',
    notes: '',
  });
  const [newFeeAssignment, setNewFeeAssignment] = useState({
    fee: '',
    discount: '',
  });

  const { studentPayments, loading: paymentsLoading, error: paymentsError } = useSelector(
    (state) => state.payments
  );
  
  const { studentFeeAssignments, loading: feeAssignmentsLoading, error: feeAssignmentsError } = useSelector(
    (state) => state.feeAssignments
  );
  
  const { allFees, loading: feesLoading, error: feesError } = useSelector(
    (state) => state.fees
  );
  
  const { allDiscounts, loading: discountsLoading, error: discountsError } = useSelector(
    (state) => state.discounts
  );

  // Since payments don't have fee_assignment field, we'll display them separately
  // For now, we'll show fee assignments and payments in separate sections
  const feeAssignmentsWithPayments = React.useMemo(() => {
    return studentFeeAssignments.map(feeAssignment => {
      // Since we can't directly link payments to fee assignments,
      // we'll show the fee assignment data as is
      return {
        ...feeAssignment,
        payments: [], // No direct payment linking
        totalPaid: 0, // Will be calculated separately
        calculatedRemaining: parseFloat(feeAssignment.final_amount || 0)
      };
    });
  }, [studentFeeAssignments]);

  // Calculate totals using the fee_data.value field
  const totalFeeValue = React.useMemo(() => {
    return studentFeeAssignments.reduce((sum, feeAssignment) => 
      sum + parseFloat(feeAssignment.fee_data?.value || 0), 0
    );
  }, [studentFeeAssignments]);

  const totalDiscountValue = React.useMemo(() => {
    return studentFeeAssignments.reduce((sum, feeAssignment) => 
      sum + parseFloat(feeAssignment.discount_data?.value || 0), 0
    );
  }, [studentFeeAssignments]);

  const totalFinalAmount = React.useMemo(() => {
    return studentFeeAssignments.reduce((sum, feeAssignment) => 
      sum + parseFloat(feeAssignment.final_amount || 0), 0
    );
  }, [studentFeeAssignments]);

  const paidAmount = React.useMemo(() => {
    return studentPayments.reduce((sum, payment) => 
      sum + parseFloat(payment.amount_paid || 0), 0
    );
  }, [studentPayments]);

  const remainingAmount = React.useMemo(() => {
    // Calculate remaining as: Total Final Amount - Total Payments
    return totalFinalAmount - paidAmount;
  }, [totalFinalAmount, paidAmount]);

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentPayments(studentId));
      dispatch(fetchStudentFeeAssignments(studentId));
      dispatch(fetchAllFees());
      dispatch(fetchAllDiscounts());
    }
    return () => {
      dispatch(clearStudentPayments());
      dispatch(clearStudentFeeAssignments());
    };
  }, [dispatch, studentId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(amount || 0));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (feeAssignment) => {
    // Since we can't link payments to specific fee assignments,
    // we'll show all as "Pending Payment" for now
    return 'error';
  };

  const getStatusText = (feeAssignment) => {
    // Since we can't link payments to specific fee assignments,
    // we'll show all as "Pending Payment" for now
    return 'Pending Payment';
  };

  const handleViewPayment = (feeAssignment) => {
    setSelectedFeeAssignment(feeAssignment);
    setViewDialogOpen(true);
  };

  const handleAddPayment = () => {
    setAddPaymentDialogOpen(true);
  };

  const handleAddFeeAssignment = () => {
    setAddFeeAssignmentDialogOpen(true);
  };

  const handleCreatePayment = () => {
    if (!newPayment.amount_paid || !newPayment.fee_assignment) {
      alert('Please fill in all required fields');
      return;
    }

    const paymentData = {
      student: studentId,
      fee_assignment: parseInt(newPayment.fee_assignment),
      amount_paid: parseFloat(newPayment.amount_paid),
      date: newPayment.date,
      notes: newPayment.notes || ''
    };

    dispatch(createPayment(paymentData)).then(() => {
      handleCloseDialogs();
      // Refresh the payments list
      dispatch(fetchStudentPayments(studentId));
    });
  };

  const handleCreateFeeAssignment = () => {
    if (!newFeeAssignment.fee) {
      alert('Please select a fee');
      return;
    }

    const feeAssignmentData = {
      fee: parseInt(newFeeAssignment.fee),
      student: studentId.toString(),
      discount: newFeeAssignment.discount ? parseInt(newFeeAssignment.discount) : null
    };

    dispatch(createFeeAssignment(feeAssignmentData)).then(() => {
      handleCloseDialogs();
      // Refresh the fee assignments list
      dispatch(fetchStudentFeeAssignments(studentId));
    });
  };

  const handleCloseDialogs = () => {
    setViewDialogOpen(false);
    setAddPaymentDialogOpen(false);
    setAddFeeAssignmentDialogOpen(false);
    setSelectedFeeAssignment(null);
    setNewPayment({
      amount_paid: '',
      date: new Date().toISOString().split('T')[0],
      fee_assignment: '',
      notes: '',
    });
    setNewFeeAssignment({
      fee: '',
      discount: '',
    });
  };

  const loading = paymentsLoading || feeAssignmentsLoading;
  const error = paymentsError || feeAssignmentsError;

  if (loading) {
    return (
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
          Financial Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
          Financial Information
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
          Financial Information
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<School />}
            onClick={handleAddFeeAssignment}
            sx={{ textTransform: 'none' }}
          >
            Add Fee Assignment
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddPayment}
            sx={{ textTransform: 'none' }}
          >
            Add Payment
          </Button>
        </Box>
      </Box>

      {/* Financial Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: 1.5,
            boxShadow: 1,
            height: '100%'
          }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachMoney sx={{ fontSize: 20, mr: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Total Fees
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {formatCurrency(totalFeeValue)}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Sum of all fee values
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            borderRadius: 1.5,
            boxShadow: 1,
            height: '100%'
          }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Discount sx={{ fontSize: 20, mr: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Total Discounts
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {formatCurrency(totalDiscountValue)}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Sum of all discounts
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
            borderRadius: 1.5,
            boxShadow: 1,
            height: '100%'
          }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Payment sx={{ fontSize: 20, mr: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Total Payments
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {formatCurrency(paidAmount)}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Total payments received
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
            borderRadius: 1.5,
            boxShadow: 1,
            height: '100%'
          }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingDown sx={{ fontSize: 20, mr: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Remaining
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {formatCurrency(remainingAmount)}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Final Amount - Payments
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Fee Assignments Table */}
      <Card sx={{ borderRadius: 2, boxShadow: 1, mb: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              Fee Assignments
            </Typography>
          </Box>
          
          {feeAssignmentsWithPayments.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Receipt sx={{ fontSize: 64, color: theme.palette.grey[400], mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No Fee Assignments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No fee assignments available for this student.
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                    <TableCell sx={{ fontWeight: 600 }}>Fee Details</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Fee Value</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Discount</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Final Amount</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feeAssignmentsWithPayments.map((feeAssignment, index) => (
                    <TableRow key={`${feeAssignment.fee_data?.id}-${feeAssignment.discount_data?.id || 'no-discount'}`} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {feeAssignment.fee_data?.name || 'N/A'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {feeAssignment.fee_data?.symbol || ''}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatCurrency(feeAssignment.fee_data?.value)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {feeAssignment.discount_data ? (
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {formatCurrency(feeAssignment.discount_data.value)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {feeAssignment.discount_data.name}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No discount
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatCurrency(feeAssignment.final_amount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusText(feeAssignment)}
                          color={getStatusColor(feeAssignment)}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => handleViewPayment(feeAssignment)}
                              color="primary"
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Print Receipt">
                            <IconButton size="small" color="secondary">
                              <Print />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton size="small" color="info">
                              <Download />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              Payment History
            </Typography>
          </Box>
          
          {studentPayments.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Payment sx={{ fontSize: 64, color: theme.palette.grey[400], mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No Payment Records
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No payment history available for this student.
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                    <TableCell sx={{ fontWeight: 600 }}>Payment Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Amount Paid</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentPayments.map((payment, index) => (
                    <TableRow key={payment.id} hover>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(payment.date)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                          {formatCurrency(payment.amount_paid)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Print Receipt">
                            <IconButton size="small" color="secondary">
                              <Print />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton size="small" color="info">
                              <Download />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Payment Details Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseDialogs} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Receipt sx={{ mr: 1, color: theme.palette.primary.main }} />
            Fee Assignment Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedFeeAssignment && (
            <Box>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Fee Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Fee Name</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedFeeAssignment.fee_data?.name || 'N/A'}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Symbol</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedFeeAssignment.fee_data?.symbol || 'N/A'}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Description</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedFeeAssignment.fee_data?.description || 'N/A'}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Financial Summary
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Fee Value</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {formatCurrency(selectedFeeAssignment.fee_data?.value)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Discount</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedFeeAssignment.discount_data 
                          ? formatCurrency(selectedFeeAssignment.discount_data.value)
                          : 'No discount'
                        }
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Final Amount</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {formatCurrency(selectedFeeAssignment.final_amount)}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>

            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Close</Button>
          <Button variant="contained" startIcon={<Print />}>
            Print Receipt
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Payment Dialog */}
      <Dialog open={addPaymentDialogOpen} onClose={handleCloseDialogs} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Add sx={{ mr: 1, color: theme.palette.primary.main }} />
            Add New Payment
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Amount Paid"
              type="number"
              value={newPayment.amount_paid}
              onChange={(e) => setNewPayment({ ...newPayment, amount_paid: e.target.value })}
              InputProps={{
                startAdornment: <AttachMoney sx={{ mr: 1, color: theme.palette.text.secondary }} />
              }}
            />
            <TextField
              fullWidth
              label="Payment Date"
              type="date"
              value={newPayment.date}
              onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <InputLabel>Select Fee Assignment</InputLabel>
              <Select
                value={newPayment.fee_assignment}
                onChange={(e) => setNewPayment({ ...newPayment, fee_assignment: e.target.value })}
                label="Select Fee Assignment"
              >
                {studentFeeAssignments.map((feeAssignment) => (
                  <MenuItem key={feeAssignment.id} value={feeAssignment.id}>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {feeAssignment.fee_data?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Fee Value: {formatCurrency(feeAssignment.fee_data?.value)} | 
                        Final Amount: {formatCurrency(feeAssignment.final_amount)}
                        {feeAssignment.discount_data && (
                          <> | Discount: {feeAssignment.discount_data.name} ({formatCurrency(feeAssignment.discount_data.value)})</>
                        )}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Notes (Optional)"
              multiline
              rows={3}
              value={newPayment.notes || ''}
              onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
              placeholder="Add any notes about this payment..."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancel</Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleCreatePayment}>
            Add Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Fee Assignment Dialog */}
      <Dialog open={addFeeAssignmentDialogOpen} onClose={handleCloseDialogs} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <School sx={{ mr: 1, color: theme.palette.primary.main }} />
            Add Fee Assignment
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>Select Fee</InputLabel>
              <Select
                value={newFeeAssignment.fee}
                onChange={(e) => setNewFeeAssignment({ ...newFeeAssignment, fee: e.target.value })}
                label="Select Fee"
              >
                {allFees.map((fee) => (
                  <MenuItem key={fee.id} value={fee.id}>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {fee.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Value: {formatCurrency(fee.value)} | 
                        Installment Available: {fee.is_installment_available ? 'Yes' : 'No'}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Select Discount (Optional)</InputLabel>
              <Select
                value={newFeeAssignment.discount}
                onChange={(e) => setNewFeeAssignment({ ...newFeeAssignment, discount: e.target.value })}
                label="Select Discount (Optional)"
              >
                <MenuItem value="">
                  <Typography variant="body2" color="text.secondary">
                    No discount
                  </Typography>
                </MenuItem>
                {allDiscounts.map((discount) => (
                  <MenuItem key={discount.id} value={discount.id}>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {discount.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Value: {formatCurrency(discount.value)} | 
                        Type: {discount.discount_type}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancel</Button>
          <Button variant="contained" startIcon={<School />} onClick={handleCreateFeeAssignment}>
            Add Fee Assignment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinancialSection;
