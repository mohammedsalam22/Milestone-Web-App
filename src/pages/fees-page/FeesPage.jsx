import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchAllFees, createFee, updateFee, deleteFee } from '../../featuers/fees-slice/feesSlice';
import {
  FeesHeader,
  FeesTable,
  EmptyState,
  CreateFeeDialog,
  EditFeeDialog,
  DeleteConfirmationDialog,
} from './components';

const FeesPage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { fees, loading, error } = useSelector((state) => state.fees);

  const isRTL = i18n.language === 'ar';

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  // Form state
  const [formData, setFormData] = useState({ 
    symbol: '', 
    name: '', 
    description: '', 
    value: '', 
    is_chosen: false,
    is_installment_available: false
  });
  const [formErrors, setFormErrors] = useState({});

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [installmentFilter, setInstallmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    dispatch(fetchAllFees());
  }, [dispatch]);

  const handleCreateClick = () => {
    setFormData({ 
      symbol: '', 
      name: '', 
      description: '', 
      value: '', 
      is_chosen: false,
      is_installment_available: false
    });
    setFormErrors({});
    setCreateDialogOpen(true);
  };

  const handleEditClick = (fee) => {
    setSelectedFee(fee);
    setFormData({ 
      symbol: fee.symbol, 
      name: fee.name, 
      description: fee.description, 
      value: fee.value, 
      is_chosen: fee.is_chosen,
      is_installment_available: fee.is_installment_available
    });
    setFormErrors({});
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (fee) => {
    setSelectedFee(fee);
    setDeleteDialogOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.symbol.trim()) {
      errors.symbol = t('symbolRequired');
    }
    if (!formData.name.trim()) {
      errors.name = t('nameRequired');
    }
    if (!formData.value || formData.value <= 0) {
      errors.value = t('valueRequired');
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async () => {
    if (!validateForm()) return;
    const resultAction = await dispatch(createFee(formData));
    if (createFee.fulfilled.match(resultAction)) {
      setCreateDialogOpen(false);
      setFormData({ 
        symbol: '', 
        name: '', 
        description: '', 
        value: '', 
        is_chosen: false,
        is_installment_available: false
      });
    }
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) return;
    const resultAction = await dispatch(updateFee({ id: selectedFee.id, data: formData }));
    if (updateFee.fulfilled.match(resultAction)) {
      setEditDialogOpen(false);
      setSelectedFee(null);
      setFormData({ 
        symbol: '', 
        name: '', 
        description: '', 
        value: '', 
        is_chosen: false,
        is_installment_available: false
      });
    }
  };

  const handleDeleteConfirm = async () => {
    const resultAction = await dispatch(deleteFee(selectedFee.id));
    if (deleteFee.fulfilled.match(resultAction)) {
      setDeleteDialogOpen(false);
      setSelectedFee(null);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getStatusColor = (isChosen) => {
    return isChosen ? 'success' : 'default';
  };

  const getStatusLabel = (isChosen) => {
    return isChosen ? t('chosen') : t('notChosen');
  };

  const getInstallmentColor = (isAvailable) => {
    return isAvailable ? 'primary' : 'secondary';
  };

  const getInstallmentLabel = (isAvailable) => {
    return isAvailable ? t('available') : t('notAvailable');
  };

  const filteredAndSortedFees = fees
    .filter(fee => {
      const matchesSearch = fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fee.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fee.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'chosen' && fee.is_chosen) ||
                           (statusFilter === 'notChosen' && !fee.is_chosen);
      const matchesInstallment = installmentFilter === 'all' || 
                                (installmentFilter === 'available' && fee.is_installment_available) ||
                                (installmentFilter === 'notAvailable' && !fee.is_installment_available);
      return matchesSearch && matchesStatus && matchesInstallment;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'symbol': return a.symbol.localeCompare(b.symbol);
        case 'value': return parseFloat(a.value) - parseFloat(b.value);
        case 'status': return a.is_chosen - b.is_chosen;
        case 'installment': return a.is_installment_available - b.is_installment_available;
        default: return 0;
      }
    });

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setInstallmentFilter('all');
  };

  if (loading && fees.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, ...(isRTL && { direction: 'rtl', textAlign: 'right' }) }}>
      {/* Header with Title and Filters */}
      <FeesHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        installmentFilter={installmentFilter}
        setInstallmentFilter={setInstallmentFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onCreateClick={handleCreateClick}
        isRTL={isRTL}
      />

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Fees Table or Empty State */}
      {filteredAndSortedFees.length === 0 ? (
        <EmptyState
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          installmentFilter={installmentFilter}
          onCreateClick={handleCreateClick}
          onClearFilters={handleClearFilters}
          isRTL={isRTL}
        />
      ) : (
        <FeesTable
          fees={filteredAndSortedFees}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
          getInstallmentColor={getInstallmentColor}
          getInstallmentLabel={getInstallmentLabel}
        />
      )}

      {/* Dialogs */}
      <CreateFeeDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        formData={formData}
        formErrors={formErrors}
        loading={loading}
        onInputChange={handleInputChange}
        onSubmit={handleCreateSubmit}
      />

      <EditFeeDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        formData={formData}
        formErrors={formErrors}
        loading={loading}
        onInputChange={handleInputChange}
        onSubmit={handleEditSubmit}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        selectedFee={selectedFee}
        loading={loading}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default FeesPage;
