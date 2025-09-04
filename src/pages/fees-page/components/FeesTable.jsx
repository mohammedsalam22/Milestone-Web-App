import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Switch,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AttachMoney as FeeIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const FeesTable = ({
  fees,
  onEditClick,
  onDeleteClick,
  getStatusColor,
  getStatusLabel,
  getInstallmentColor,
  getInstallmentLabel,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const formatValue = (value) => {
    return `${value} ${t('currency')}`;
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
            <TableCell sx={{ fontWeight: 600 }}>{t('fee')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('symbol')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('value')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('status')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('installment')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('description')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fees.map((fee) => (
            <TableRow
              key={fee.id}
              sx={{
                '&:hover': { backgroundColor: theme.palette.action.hover },
                transition: 'background-color 0.2s ease',
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    width: 40,
                    height: 40,
                  }}>
                    <FeeIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {fee.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: #{fee.id}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={fee.symbol}
                  size="small"
                  color="default"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                  {formatValue(fee.value)}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(fee.is_chosen)}
                  size="small"
                  color={getStatusColor(fee.is_chosen)}
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={getInstallmentLabel(fee.is_installment_available)}
                  size="small"
                  color={getInstallmentColor(fee.is_installment_available)}
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
              <TableCell>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {fee.description || t('noDescription')}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title={t('edit')}>
                    <IconButton onClick={() => onEditClick(fee)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('delete')}>
                    <IconButton onClick={() => onDeleteClick(fee)} color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeesTable;
