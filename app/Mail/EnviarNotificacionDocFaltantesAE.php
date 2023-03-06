<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EnviarNotificacionDocFaltantesAE extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($datos_mensaje,$lista)
    {
        //
        $this->msg=$datos_mensaje;
        $this->lista=$lista;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        $codigo = $this->msg->c_codSolicitud;

        return new Envelope(
            subject: 'Solicitud - '.$codigo,
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        $nombre = $this->msg->c_nombres;
        $a_Pater = $this->msg->c_apellidoP;
        $a_Mater = $this->msg->c_apellidoM;

        return new Content(
            view: 'emails.notificacionDocFaltantes',
            with: [
                'nombre_completo' => strtoupper($nombre." ".$a_Pater." ".$a_Mater),
                'finalidad' => $this->msg->c_nomFinalidadSolicitud,
                'lista_documentos' => $this->lista,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
