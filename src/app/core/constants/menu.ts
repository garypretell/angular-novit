import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Módulos',
      separator: false,
      items: [
        {
          icon: 'assets/icons/outline/users.svg',
          label: 'Usuarios',
          route: '/novit/user',
          children: [
            { label: 'Listado', route: '/novit/user/list' },
            { label: 'Nuevo', route: '/novit/user/create' },
          ],
        },
        // {
        //   icon: 'assets/icons/outline/chart-pie.svg',
        //   label: 'Administrador',
        //   route: '/novit/administrador',
        //   children: [
        //     { label: 'Institución', route: '/novit/administrador/institucion' },
        //     { label: 'Entidad', route: '/novit/administrador/entidad' },
        //     { label: 'Transacción', route: '/novit/administrador/transaccion' },
        //     { label: 'Moneda', route: '/novit/administrador/moneda' },
        //     { label: 'Perfil', route: '/novit/administrador/perfil' },
        //     { label: 'Mapeo Códigos', route: '/novit/administrador/mapeo-codigo' },
        //     { label: 'Parámetros', route: '/novit/administrador/parametro' },
        //     { label: 'Grupo Parámetro', route: '/novit/administrador/grupo-parametro' }
        //   ],
        // },
        // {
        //   icon: 'assets/icons/outline/lock-closed.svg',
        //   label: 'Consultas',
        //   route: '/novit/consultas',
        //   children: [
        //     { label: 'Transaccional', route: '/novit/consultas',
        //       children: [
        //         { label: 'Origen', route: '/novit/consultas/consulta-transaccional-origen' },
        //         { label: 'Destino', route: '/novit/consultas/consulta-transaccional-destino' },
        //       ]
        //     },
        //     { label: 'Consolidado', route: '/novit/consultas/consolidado' },
        //     { label: 'Notificación CCE', route: '/novit/consultas/notificacion-cce' },
        //     { label: 'Archivo Diferencias', route: '/novit/consultas/archivo-diferencias' }
        //   ],
        // },
        // {
        //   icon: 'assets/icons/outline/lock-closed.svg',
        //   label: 'Consultas Históricas',
        //   route: '/novit/consultas-historicas',
        //   children: [
        //     { label: 'Transaccional', route: '/novit/consultas-historicas',
        //       children: [
        //         { label: 'Origen', route: '/novit/consultas-historicas/consulta-historica-transaccional-origen' },
        //         { label: 'Destino', route: '/novit/consultas-historicas/consulta-historica-transaccional-destino' },
        //       ]
        //     },
        //     { label: 'Consolidado', route: '/novit/consultas-historicas/consolidado' },
        //     { label: 'Notificación CCE Hst', route: '/novit/consultas-historicas/notificacion-cce' },
        //     { label: 'Archivo Histórico Diferencias', route: '/novit/consultas-historicas/archivo-diferencias' }
        //   ],
        // },
        // {
        //   icon: 'assets/icons/outline/lock-closed.svg',
        //   label: 'Regularización',
        //   route: '/novit/regularizacion',
        //   children: [
        //     { label: 'Parámetros de Procesos', route: '/novit/regularizacion/parametro-proceso' },
        //     { label: 'Transacciones Pendientes', route: '/novit/regularizacion',icon: 'assets/icons/outline/chart-pie.svg',
        //       children: [
        //         { label: 'Origen', route: '/novit/regularizacion/transacciones-pendientes-origen' },
        //         { label: 'Destino', route: '/novit/regularizacion/transacciones-pendientes-destino' },
        //       ]
        //     },
        //     { label: 'Liquidación', route: '/novit/regularizacion',icon: 'assets/icons/outline/chart-pie.svg',
        //       children: [
        //         { label: 'Origen', route: '/novit/regularizacion/liquidacion-origen' },
        //         { label: 'Destino', route: '/novit/regularizacion/liquidacion-destino' },
        //       ]
        //     },
        //     { label: 'Cierre', route: '/novit/regularizacion/cierre' },
        //     { label: 'Monitor', route: '/novit/regularizacion/monitor' },
        //     { label: 'Bilateral', route: '/novit/regularizacion/bilateral' },
        //     { label: 'Emitidas y Recibidas', route: '/novit/regularizacion/emitidas-recibidas' },
        //   ],
        // },
        // {
        //   icon: 'assets/icons/outline/chart-pie.svg',
        //   label: 'Cuadre Host',
        //   route: '/novit/cuadre-host',
        //   children: [
        //     { label: 'Emitidas y Recibidas Host', route: '/novit/cuadre-host/emitidas-recibidas-host' },
        //     { label: 'Parámetros de Procesos Host', route: '/novit/cuadre-host/parametro-proceso-host' }
        //   ],
        // },
        // {
        //   icon: 'assets/icons/outline/lock-closed.svg',
        //   label: 'Operación',
        //   route: '/novit/operacion',
        //   children: [
        //     { label: 'Sign on/off', route: '/novit/operacion/sign-on-off' },
        //     { label: 'Archivo de Conciliación', route: '/novit/operacion/archivo-conciliacion' },
        //     { label: 'Calendario', route: '/novit/operacion/calendario' },
        //     { label: 'Notificación CCE', route: '/novit/operacion',
        //       children: [
        //         { label: 'Contacto', route: '/novit/operacion/notificacion-cce-contacto' },
        //         { label: 'Plantilla', route: '/novit/operacion/notificacion-cce-plantilla' },
        //       ]
        //     },
        //     { label: 'Depuración Histórica', route: '/novit/operacion/depuracion-historica' }
        //   ]
        // },
        // {
        //   icon: 'assets/icons/outline/chart-pie.svg',
        //   label: 'Seguridad',
        //   route: '/novit/seguridad',
        //   children: [
        //     { label: 'Cambiar Contraseña usuario', route: '/novit/seguridad/change-password' },
        //     { label: 'Auditoria', route: '/novit/seguridad/auditoria' }
        //   ],
        // },
        // {
        //   icon: 'assets/icons/outline/chart-pie.svg',
        //   label: 'Procesos',
        //   route: '/novit/procesos',
        //   children: [
        //     { label: 'Gestionar Procesos', route: '/novit/procesos/gestionar-proceso' },
        //     { label: 'Consultar Evento por Proceso', route: '/novit/procesos/consulta-evento-proceso' }
        //   ]
        // },
        // {
        //   icon: 'assets/icons/outline/lock-closed.svg',
        //   label: 'Utilitarios',
        //   route: '/novit/utilitarios',
        //   children: [
        //     { label: 'Backup & Restore', route: '/novit/utilitarios',
        //       children: [
        //         { label: 'Respaldo de Transacciones Históricas', route: '/novit/utilitarios/respaldo' },
        //         { label: 'Recuperación de Transacciones Históricas', route: '/novit/utilitarios/recuperacion' },
        //         { label: 'Parámetros', route: '/novit/utilitarios/utilitarios-parametros' }
        //       ]
        //     },
        //     { label: 'Panel de Transacciones', route: '/novit/utilitarios/panel-transacciones' },
        //     { label: 'Transferir transacciones de operaciones a histórico', route: '/novit/utilitarios/transferir-transacciones' }
        //   ],
        // },
      ],
    }
  ];
}
