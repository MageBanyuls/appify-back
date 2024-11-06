class DtePayloadBuilder {
    static buildDtePayload(TipoDTE,encabezado, detalle, referencia) {
        return {
            Encabezado: {
                IdDoc: {
                    TipoDTE: TipoDTE,
                    FchEmis: encabezado.FchEmis,
                    Folio: encabezado.Folio
                },
                Emisor: {
                    RUTEmisor: encabezado.RUTEmisor
                },
                Receptor: {
                    RUTRecep: encabezado.RUTRecep,
                    RznSocRecep: encabezado.RznSocRecep,
                    GiroRecep: encabezado.GiroRecep,
                    Contacto: encabezado.Contacto,
                    CorreoRecep: encabezado.CorreoRecep,
                    DirRecep: encabezado.DirRecep,
                    CmnaRecep: encabezado.CmnaRecep
                }
                },
                Detalle: detalle.map(item => ({
                NmbItem: item.NmbItem,
                QtyItem: item.QtyItem,
                PrcItem: item.PrcItem
                })),
                Referencia: referencia.map(ref => ({
                TpoDocRef: ref.TpoDocRef,
                FolioRef: ref.FolioRef,
                FchRef: ref.FchRef
                }))
        };
    }
}

export default DtePayloadBuilder